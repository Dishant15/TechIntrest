import $ from 'jquery';
import React from 'react';

export const ErrorList = props => (
    /*
    Show list of errors in all forms
    */
    <p class="text-danger" ><b>{props.error}</b></p>
);

export function submitFormData(url, data, callback, errback){
    $.ajax({
        url ,
        data ,
        type: 'post',
        dataType: 'json',
        success: (response) => {
            callback(response);
        },
        error: (err) => {
            errback(err);
        }
    });
}
