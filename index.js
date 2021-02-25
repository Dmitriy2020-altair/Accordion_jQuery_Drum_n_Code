'use strict'

class Accordion {
	constructor(id, {
		type = 'random'
	}) {
		this.container = $(`#${id}`);
		this.setUIType(type);
	}

	setUIType(type) {

		this.closeAllItems();
		this.openItem(1);

		const prevUIType = (type === 'random')
			? this.setUITypeParticular
			: this.setUITypeRandom;

		const newUIType = (type === 'random')
			? this.setUITypeRandom
			: this.setUITypeParticular;

		this.container
			.find('.accordion__item')
			.off('click', prevUIType)
			.on('click', newUIType);

		this.type = (type === 'random') ? 'random' : 'particular';
	}

	setUITypeRandom() {
		$(this).toggleClass('accordion__item--active');
	}

	setUITypeParticular() {
		const accordionItem = $(this);

		accordionItem
			.closest('.accordion')
			.find('.accordion__item--active')
			.removeClass('accordion__item--active');

		accordionItem.addClass('accordion__item--active');
	}

	closeAllItems() {
		this.container
			.find('.accordion__item--active')
			.removeClass('accordion__item--active');
	}

	openItem(itemIndex) {
		this.container
			.find(`.accordion__item[index='${itemIndex}']`)
			.addClass('accordion__item--active');
	}
}

const accordionOne = new Accordion('accordion-one', { type: 'random' });
const toggleAccordionUIButton = $('#toggleUIButton');
const typeOfUI = toggleAccordionUIButton
	.find('.accordion__interface-type')
	.text(accordionOne.type);

toggleAccordionUIButton.on('click', () => {
	const newType = (accordionOne.type === 'random') ? 'particular' : 'random';

	accordionOne.setUIType(newType);
	typeOfUI.text(newType);
})

