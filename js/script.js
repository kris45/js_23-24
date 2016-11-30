//MVC

function Model(data){
	var self = this;

	self.data = data;

	self.addItem = function (item) {

		if (item.length === 0){
			return;
		}

		self.data.push(item);

		return self.data;

	}

	self.removeItem = function (item) {
		var index = self.data.indexOf(item);

		if (index === -1) {
			return;
		}

		self.data.splice(index, 1);

		return self.data;
	} 

	self.editItem = function (item){
		var index = self.data.indexOf(item);

		self.data[index] = item;

		return self.data
	}

	self.edit = function (item, index) {

		self.data[index] = item;

		return self.data;

	}
}

function View(model){

	var self = this;

	 function init() {

		var wrapper = tmpl($('#wrapper-template').html());

		$('body').append(wrapper);
		self.elements = {
			input: $('.item-value'),
			addBtn: $('.item-add'),
			editBtn: $('.item-edit'),
			listContainer: $('.item-list')
		};

		self.renderList(model.data);

	}

	self.renderList = function(data) {
		var list = tmpl($('#list-template').html(), {data: data});
		self.elements.listContainer.html(list);
	};

	init();

}

function Controller(model, view) {
	
	var self = this;
	var editIndex;

	view.elements.addBtn.on('click', addItem);
	view.elements.listContainer.on('click', '.item-delete', removeItem);
	view.elements.listContainer.on('click', '.item-edit', editItem);
	view.elements.editBtn.on('click', editBtn);
	

	function addItem(){
		var newItem = view.elements.input.val();
		model.addItem(newItem);
		view.renderList(model.data);
		view.elements.input.val('');
	}

	function removeItem() {
		var item = $(this).attr('data-value');
		model.removeItem(item);
		view.renderList(model.data);
	}

	function editItem(){
		var item = $(this).attr('data-value');
		view.elements.input.val(item);
		editIndex = model.data.indexOf(item);
	}

	function editBtn(){
		var editItem = view.elements.input.val();
		model.edit(editItem, editIndex);
		view.renderList(model.data);
		view.elements.input.val('');
	}
}

$(function () {
	var toDolist =  ['learn javascript', 'learn jQuery', 'learn Angular'];
	var model = new Model(toDolist);
	var view = new View(model);
	var controller = new Controller(model, view);

});