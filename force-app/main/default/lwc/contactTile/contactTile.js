/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 31.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, api } from 'lwc';

export default class ContactTile extends LightningElement {

    @api contact;

    @api selectedContactId = '';

    get tileSelected(){
        return this.selectedContactId === this.contact.Id ? 'tile selected' : 'tile';
    }

    handleContactSelect(){
        const event = new CustomEvent('contactselected', {
            bubbles : true,
            composed : true,
            detail : {
                contactId : this.contact.Id
            }
        });

        this.dispatchEvent(event);
    }

}