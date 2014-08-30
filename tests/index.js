var assert = require('assert');

suite('Testy', function() {
	//Lista jest dostepna
	//Mozemy uzyskac dostep do listy
	//Lista jest pusta
	test('Test Listy', function(done, client) {
		client.eval(function() {
		var ilosc = Lists.find().fetch();
		emit('ilosc', ilosc);
		}).once('ilosc', function(ilosc) {
			assert.equal(ilosc.length, 0);
			done();
			});
	});

	test('Test zadan', function(done, client) {
		client.eval(function() {
		var ilosc = Todos.find().fetch();
		emit('ilosc', ilosc);
		}).once('ilosc', function(ilosc) {
			assert.equal(ilosc.length, 0);
			done();
			});
	});
	//Dodanie nowej listy listka
	//Po dodaniu mozliwosc odczytu
 	test('Czy istnieje lista', function(done, client) {
	client.eval(function() {
		Lists.insert({
		Name: 'listka'
		});
			var sprawdzenie = Lists.find({
			Name: 'listka'}).fetch();
			emit('sprawdzenie', sprawdzenie);
			});
			client.once('sprawdzenie', function(sprawdzenie) {
			assert.equal(sprawdzenie.length, 1);
			done();
		});
	});
	test('Czy istnieje zadanie', function(done, client) {
	client.eval(function() {
		Todos.insert({
		todotext: '',
		listid:Session.get('listid'),
		done:false
		});
			var sprawdzenie = Todos.find({
			Name: 'listka'}).fetch();
			emit('sprawdzenie', sprawdzenie);
			});
			client.once('sprawdzenie', function(sprawdzenie) {
			assert.equal(sprawdzenie.length, 1);
			done();
		});
	});
	test('Inicjalizacja klienta', function(done, client) {
		client.eval(function() {
		var testup = Lists.find().fetch();
		emit('testup', testup);
		}).once('testup', function(testup) {
		assert.equal(testup.length, 0);
		done();
		});
	});

	test('Inicjalizacja serwera', function(done, server) {
		server.eval(function() {
		var testup = Lists.find().fetch();
		emit('testup', testup);
		}).once('testup', function(testup) {
		assert.equal(testup.length, 0);
		done();
		});
	});
	
	//sprawdzenie w przypadku podania pustej nazwy listy przez klienta
	 test('Podanie pustej nazwy listy przez klienta', function(done, client) {
		client.eval(function() {
		Lists.insert({
		name: ''
		});
			var listka = Lists.find({
			name: ''}).fetch();
			emit('listka', listka);
			});
				client.once('listka', function(listka) {
				assert.equal(listka.length, 1);
				done();
				});
	});
	
	//sprawdzenie w przypadku podania pustej nazwy listy przez serwer
	 test('Podanie pustej nazwy listy przez serwer', function(done, client) {
		server.eval(function() {
		Lists.insert({
		name: ''
		});
			var listka = Lists.find({
			name: ''}).fetch();
			emit('listka', listka);
			});
				server.once('listka', function(listka) {
				assert.equal(listka.length, 1);
				done();
				});
	});
	//sprawdzenie w przypadku podania pustego zadania przez klienta
	 test('Podanie pustej zadania', function(done, client) {
		client.eval(function() {
		Todos.insert({
		todotext: '',
		listid:Session.get('listid'),
		done:false
		});
			var listka = Lists.find({
			todotext: ''}).fetch();
			emit('listka', listka);
			});
				client.once('listka', function(listka) {
				assert.equal(listka.length, 1);
				done();
				});
	});
	
	//sprawdzenie w przypadku podania pustego zadania przez serwer
	 test('Podanie pustego zadania', function(done, client) {
		server.eval(function() {
		Todos.insert({
		todotext: '',
		listid:Session.get('listid'),
		done:false
		});
			var listka = Lists.find({
			todotext: ''}).fetch();
			emit('listka', listka);
			});
				server.once('listka', function(listka) {
				assert.equal(listka.length, 1);
				done();
				});
	});
	
	 test('Usuwanie listy', function(done, client) {
		client.eval(function() {
		var listka = "listka";
		Lists.insert({ name: listka});
		Lists.remove({ name: "listka"});
		var check = Lists.find({ name: "listka"}).fetch();
			emit('check', check);
			}).once('check', function(check) {
			assert.equal(check.length, 0);
			done();
		});
	});
	
	test('Usuwanie zadania', function(done, client) {
		client.eval(function() {
		var zadanie = "zadanie";
		Todos.insert({ todotext: zadanie,
		listid:Session.get('listid'),
		done:false});
		Lists.remove({ name: "zadanie"});
		var check = Todos.find({ name: "zadanie"}).fetch();
			emit('check', check);
			}).once('check', function(check) {
			assert.equal(check.length, 0);
			done();
		});
	});

	
