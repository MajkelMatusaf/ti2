Template.zadanie.list = function(){
	return Lists.findOne({_id:Session.get('listid')});
}
Template.zadanie.todolist = function(){
	return Todos.find({listid:Session.get('listid')});
}
Template.zadanie.events({
	'click .guzik2':function(evt,tmpl) {
			var todotext = tmpl.find('.todotext').value;
			var listka = Todos.find({todotext:todotext}).fetch();
			if (listka == 0){
			Todos.insert({todotext:todotext,listid:Session.get('listid'),done:false});
			}
			else {
			alert("Juz istnieje zadanie o podanej nazwie");
			}
			
	},
	'keyup .todotext':function(evt,tmpl){
		if(evt.which === 13){
			var todotext = tmpl.find('.todotext').value;
			var listka = Todos.find({todotext:todotext}).fetch();
			if (listka == 0){
			Todos.insert({todotext:todotext,listid:Session.get('listid'),done:false});
			}
			else {
			alert("Juz istnieje zadanie o podanej nazwie");
			}
		}
	}
})
Template.zadaniewliscie.editing_todo = function(){
	return Session.get('editing_todo');
}
Template.zadaniewliscie.done_class = function(){
	return this.done ? 'done':'';
}
Template.zadaniewliscie.done_checkbox = function(){
	return this.done ? 'checked="checked"':'';
}
Template.zadaniewliscie.events({
	'click .removetodo':function(evt,tmpl){
		Todos.remove({_id:this._id});
	},
	'dblclick .todoitemtext':function(evt,tmpl){
		evt.preventDefault();
		Session.set('editing_todo',true);
	},
	'keyup .todotext':function(evt,tmpl){
		if(evt.which === 13){
			var todotext = tmpl.find('.todotext').value;
			Todos.update(this._id,{$set:{todotext:todotext,listid:Session.get('listid')}});
			Session.set('editing_todo',false);
		}
	},
	'click .check':function(evt,tmpl){
		evt.preventDefault();
		Todos.update(this._id,{$set:{done:!this.done}});
		
	}
})
