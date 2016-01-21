db.users.insert([
	{ "_id" : "56a11db83f956d240eec0776", "mail" : "arthur.dessez@test.fr", "pass" : "azer", "pseudo" : "Arthur", 
	"friends" : [ 
		{ "pseudo" : "Olivier", "mail" : "olivier.constans@test.fr", "_id" : "56a11dd63f956d240eec0778"}, 
		{ "pseudo" : "Thomas", "mail" : "thomas.gittinger@test.fr", "_id" : "56a11dc63f956d240eec0777" } 
	], "__v" : 0 },
	{ "_id" : "56a11dd63f956d240eec0778", "mail" : "olivier.constans@test.fr", "pass" : "azer", "pseudo" : "Olivier", 
	"friends" : [ 
		{ "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" }, 
		{ "_id" : "56a11dc63f956d240eec0777", "pseudo" : "Thomas", "mail" : "thomas.gittinger@test.fr" } 
	], "__v" : 0 },
	{ "_id" : "56a11dc63f956d240eec0777", "mail" : "thomas.gittinger@test.fr", "pass" : "azer", "pseudo" : "Thomas", 
	"friends" : [ 
		{ "pseudo" : "Arthur","mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" },
		{ "mail" : "olivier.constans@test.fr", "pseudo" : "Olivier", "_id" : "56a11dd63f956d240eec0778" } 
	], "__v" : 0 }]);

db.groups.insert([
	{ "_id" : "56a11df83f956d240eec077a", "type" : "FRIEND", "name" : "56a11dc63f956d240eec077756a11db83f956d240eec0776", 
	"payments" : [ ], 
	"bills" : [ ], 
	"users" : [ 
		{ "pseudo" : "Thomas", "mail" : "thomas.gittinger@test.fr", "_id" : "56a11dc63f956d240eec0777" }, 
		{ "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" } 
	], "__v" : 0 },
	{ "_id" : "56a11e063f956d240eec077c", "type" : "FRIEND", "name" : "56a11dd63f956d240eec077856a11dc63f956d240eec0777", 
	"payments" : [ ], 
	"bills" : [ ], 
	"users" : [ 
		{ "mail" : "olivier.constans@test.fr", "pseudo" : "Olivier", "_id": "56a11dd63f956d240eec0778" }, 
		{ "_id" : "56a11dc63f956d240eec0777", "pseudo" : "Thomas", "mail" : "thomas.gittinger@test.fr" } 
	], "__v" :0 },
	{ "_id" : "56a11dfb3f956d240eec077b", "type" : "GROUP", "name" : "Test", 
	"payments" : [ 
	{ 	"identifier" : "1453399595961331", "date" : "2016-01-21T18:06:35.961Z", "descript" : "Paiement groupe", "cost" : 20, 
		"reciever" : { "mail" : "arthur.dessez@test.fr", "pseudo" : "Arthur", "_id" : "56a11db83f956d240eec0776" }, 
		"giver" : { "mail" : "thomas.gittinger@test.fr", "pseudo" : "Thomas", "_id" : "56a11dc63f956d240eec0777" } 
	} ]
	, "bills" : [ 
		{ "identifier" : "145339958289161", 
		"users" : [ 
			{ "cost" : 20, "mail" : "arthur.dessez@test.fr", "pseudo" : "Arthur", "_id" : "56a11db83f956d240eec0776" }, 
			{ "cost" : 20, "mail" : "thomas.gittinger@test.fr", "pseudo" : "Thomas", "_id" : "56a11dc63f956d240eec0777" }, 
			{ "cost" : 20, "mail" : "olivier.constans@test.fr", "pseudo" : "Olivier", "_id" : "56a11dd63f956d240eec0778" } 
		], "date" : "2016-01-21T18:06:22.891Z", "descript" :"Facture groupe",
		 "buyer" : { "cost" : 60, "mail" : "arthur.dessez@test.fr", "pseudo" : "Arthur", "_id" : "56a11db83f956d240eec0776" } 
		} ], "users" : [
			{ "mail" : "arthur.dessez@test.fr", "pseudo" : "Arthur", "_id" : "56a11db83f956d240eec0776" }, 
			{ "mail" : "thomas.gittinger@test.fr", "pseudo" : "Thomas", "_id" : "56a11dc63f956d240eec0777" }, 
			{ "mail" : "olivier.constans@test.fr", "pseudo" : "Olivier", "_id" : "56a11dd63f956d240eec0778" } 
		], "__v" : 0 },
		{ "_id" : "56a11df43f956d240eec0779", "type" : "FRIEND", "name" : "56a11dd63f956d240eec077856a11db83f956d240eec0776", 
		"payments" : [ 
			{ "date" : "2016-01-21T18:07:11.935Z", "descript" : "Paiement entre deux utilisateurs", "cost" :20, 
			"reciever" : { "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id": "56a11db83f956d240eec0776" }, 
			"giver" : { "pseudo" : "Olivier", "mail" : "olivier.constans@test.fr", "_id" : "56a11dd63f956d240eec0778" }, 
			"identifier" : "1453399631935781" } 
		], "bills" : [ 
			{ "users" : [
				 { "cost" : 25, "pseudo" : "Olivier", "mail" : "olivier.constans@test.fr", "_id" : "56a11dd63f956d240eec0778" }, 
				 {"cost" : 25, "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" } 
			], "date" : "2016-01-21T18:06:51.656Z", "descript" : "Facture entre deux utilisateurs", 
			"buyer" : { "cost" : 50, "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" }, 
			"identifier" : "145339961165671" } 
		], "users" : [ 
			{ "pseudo" : "Olivier", "mail" : "olivier.constans@test.fr", "_id" : "56a11dd63f956d240eec0778" }, 
			{ "pseudo" : "Arthur", "mail" : "arthur.dessez@test.fr", "_id" : "56a11db83f956d240eec0776" } 
		], "__v" : 0 }]);