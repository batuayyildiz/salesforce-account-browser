/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 31.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement, api } from 'lwc';

export default class ContactTiles extends LightningElement {

    @api contactList;

    @api selectedContactId = undefined;

    handleContactSelected(event){
        this.selectedContactId = event.detail.contactId;
        console.log('Selected contact id ::: ' + this.selectedContactId);
    }

    @api
    setSelectedContact(contactId){
        this.selectedContactId = contactId;
    }

}