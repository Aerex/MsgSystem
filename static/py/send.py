from mod_python import util
from bson import json_util
from bson.objectid import ObjectId
import pymongo
import json
import datetime
import hashlib
import uuid


conn = pymongo.Connection()
db = conn.udacity

def inboxPOST(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	sender = str(formdata.getfirst("from"))
	msg_id = formdata.getfirst("msgID")
	subject = formdata.getfirst("subject")
	shortedSubject = str(formdata.getfirst("shortSubject"))
	message = formdata.getfirst("msg")
	inbox = str(formdata.getfirst("to")) + "_inbox"
	sent = str(formdata.getfirst("from")) + "_sent"
	date = str(datetime.datetime.today().month) + '-' + str(datetime.datetime.today().day) + '-' + str(datetime.datetime.today().year)
	hour = datetime.datetime.today().hour
	minutes = datetime.datetime.today().minute

	if hour > 12:
		AMPM = "PM"
		hour = hour - 12
	else:
		AMPM = "AM"

	time = str(hour)+ ":" + str(minutes) + AMPM

	db[inbox].insert({'subject': subject, 'shortSubject': shortedSubject, 'message': message, 'sender': sender, 'date': date, 'time':time, 'read': '0'})
	db[sent].insert({'subject': subject, 'shortSubject': shortedSubject, 'message': message, 'sender': sender, 'date': date, 'time':time, 'read': '0'})

	return 1;

def inboxGET(req):
	msgs = []
	formdata = util.FieldStorage(req, keep_blank_values=1)
	user_inbox = str(formdata.getfirst("user")) + "_inbox"
	user_delete = str(formdata.getfirst("user")) + "_delete"
	user_sent = str(formdata.getfirst("user")) + "_sent"
	user_draft = str(formdata.getfirst("user")) + "_draft"
	view_id = int(formdata.getfirst("viewid"))
	
	if(view_id == 0):
		records = db[user_inbox].find().count()
		for x in range(0, records):
			msgs.append(db[user_inbox].find()[x])
	elif(view_id == 1):
		records = db[user_draft].find().count()
		for x in range(0, records):
			msgs.append(db[user_draft].find()[x])
	elif(view_id == 2):
		records = db[user_sent].find().count()
		for x in range(0, records):
			msgs.append(db[user_sent].find()[x])
	elif(view_id == 3):
		records = db[user_delete].find().count()
		for x in range(0, records):
			msgs.append(db[user_delete].find()[x])
	

	return json.dumps(msgs, sort_keys=True,indent=4, default=json_util.default)

def read(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	msg_id = ObjectId(formdata.getfirst("msgid"))
	view_id = int(formdata.getfirst("viewid"))

	user_inbox = formdata.getfirst("user") + "_inbox"
	user_draft = formdata.getfirst("user") + "_draft"

	if(view_id == 0):
		db[user_inbox].update({ '_id': msg_id}, { "$set": { "read": "1" } })
	elif(view_id == 1):
		db[user_draft].update({ '_id': msg_id}, { "$set": { "read": "1" } })


def unread(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	msg_id = ObjectId(formdata.getfirst("msgid"))
	user_inbox = formdata.getfirst("user") + "_inbox"

	db[user_inbox].update({ '_id': msg_id}, { "$set": { "read": "0" } })


def login(req):
	query = []
	formdata = util.FieldStorage(req, keep_blank_values=1)
	user = str(formdata.getfirst("user"))
	password = str(formdata.getfirst("password"))
	salt = "96sh72635+"
	hashed_password = hashlib.sha512(password + salt).hexdigest()
	records = db.reg_users.find({'user': user, 'hash_password': hashed_password}).count()

	if records == 0:
		return -1
	else:
		query = db.reg_users.find({'user': user, 'hash_password': hashed_password})[0]
		return json.dumps(query, sort_keys=True,indent=4, default=json_util.default)

def register(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	user = str(formdata.getfirst("user"))
	password = str(formdata.getfirst("password"))
	
	hashed_password = hashlib.sha512(password +salt).hexdigest()
	records = db.reg_users.find({'user': user, 'hash_password': hashed_password}).count()

	if records == 0:
		records = records + 1
		db.reg_users.insert({'user': user, 'hash_password': hashed_password, 'user_id': records})
		return 1	
	else:
		return -1

def delete(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	msg_id = ObjectId(formdata.getfirst("msgid"))
	user_inbox = str(formdata.getfirst("user")) + "_inbox"
	user_delete = str(formdata.getfirst("user")) + "_delete"

	msg = db[user_inbox].find({ '_id': msg_id})[0]
	db[user_delete].insert(msg)
	db[user_inbox].remove({'_id': msg_id})

def draft_new(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	sender = str(formdata.getfirst("from"))
	msg_id = formdata.getfirst("msgID")
	subject = formdata.getfirst("subject")
	shortedSubject = str(formdata.getfirst("shortSubject"))
	message = formdata.getfirst("msg")
	sent = str(formdata.getfirst("from")) + "_draft"
	date = str(datetime.datetime.today().month) + '-' + str(datetime.datetime.today().day) + '-' + str(datetime.datetime.today().year)
	hour = datetime.datetime.today().hour
	minutes = datetime.datetime.today().minute

	if hour > 12:
		AMPM = "PM"
		hour = hour - 12
	else:
		AMPM = "AM"

	time = str(hour)+ ":" + str(minutes) + AMPM

	db[sent].insert({'subject': subject, 'shortSubject': shortedSubject, 'message': message, 'sender': sender, 'date': date, 'time':time, 'read': '0'})


def draft_old(req):
	formdata = util.FieldStorage(req, keep_blank_values=1)
	msg_id = ObjectId(formdata.getfirst("msgid"))
	user_draft = str(formdata.getfirst("user")) + "_draft"
	user_inbox = str(formdata.getfirst("user")) + "_inbox"
	
	msg = db[user_inbox].find({ '_id': msg_id})[0]
	db[user_delete].insert(msg)

	



	









	


	
