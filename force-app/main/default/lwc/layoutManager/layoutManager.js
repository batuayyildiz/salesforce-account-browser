/**
 * @description       : 
 * @author            : batuayyildiz
 * @group             : 
 * @last modified on  : 22.12.2025
 * @last modified by  : batuayyildiz
**/
import { LightningElement } from 'lwc';

export default class LayoutManager extends LightningElement {

    loading = false;

    handleLoading(event){
        this.loading = true;
    }

    handleDoneLoading(event){
        this.loading = false;
    }

}