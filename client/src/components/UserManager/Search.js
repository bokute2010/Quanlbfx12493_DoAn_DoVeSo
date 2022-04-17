import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';
import './index.css';

function Search({ onSearchChange, isAdmin }) {

    function handleSelect() {
        const value = document.getElementById('searchSelect').value;
        //console.log(value);
        if (value === 'username') {
            document.getElementById('searchBox').placeholder = 'Nhập username ...'
        } else {
            document.getElementById('searchBox').placeholder = 'Nhập sô điện thoại ...'
        }
        if (value !== 'none') {
            document.getElementById('searchDiv').hidden = false;
            // After choose other search type => set value searchbox to 0 and reset event search.
            document.getElementById('searchBox').value = '';
            onSearchChange({})
        } else {
            document.getElementById('searchDiv').hidden = true

        }

    }

    function handleSearching() {
        const searchValue = document.getElementById('searchBox').value;
        const searchType = document.getElementById('searchSelect').value;



        const value = {
            searchValue: searchValue,
            searchType: searchType,
        }

        onSearchChange(value);
    }

    return (
        <div className='mt-5'>
            <FormGroup row>
                <div className='col-md-2 col-sm-4'>
                    <Input id='searchSelect' onChange={() => handleSelect()} className='searchUser' color='primary' type="select">
                        <option value={'none'} selected>
                            Tìm kiếm
                        </option>
                        <option value={'username'} >
                            Username
                        </option>
                        <option value={'phone'}>
                            Số điện thoại
                        </option>
                    </Input>
                </div>
                <div id='searchDiv' hidden className='col-md-10 col-sm-8'>
                    <Input
                        id='searchBox'
                        onChange={() => handleSearching()}

                    />
                </div>
            </FormGroup>
        </div>
    )
}

export default Search