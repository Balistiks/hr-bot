import React, {forwardRef, useState} from "react";
import {Dropdown, Form, Spinner} from "react-bootstrap";
import {Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const GeoDropDown = ({style, selectCity, setSelectCity, cities, citiesLoad}) => {
    const [value, setValue] = useState('');

    const CustomToggle = forwardRef(({children, onClick}, ref) => (
        <a href=""
           ref={ref}
           onClick={(e) => {
               e.preventDefault();
               onClick(e);
           }}
           className={'d-flex align-items-center justify-content-center link-secondary link-offset-3 link-underline-opacity-25'}
        >
            <img src={'./Geo.svg'} style={{paddingRight: 6}}/>
            {children}
            <img src={'./Dropdown.svg'} style={{paddingLeft: 6}}/>
        </a>
    ));

    const CustomMenu = forwardRef(
        ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
            return (
                <div ref={ref}
                     style={style}
                     className={className}
                     aria-labelledby={labeledBy}
                >
                    <Form.Control
                        autoFocus
                        className={styles.CustomInputDropDownMenu}
                        placeholder="Найти город"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className={`list-unstyled ${styles.CustomDropDownList}`} style={{marginTop: 9}}>
                        {children}
                    </ul>
                </div>
            );
        },
    );

    const onSelectItem = (eventKey, event) => {
        event.preventDefault();
        event.persist();
        event.stopPropagation();
        setSelectCity(eventKey)
    }

    return (
        <Dropdown style={style} drop={'down-centered'} onSelect={onSelectItem}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <Text typeText={'regular'} sizeText={'14'} color={'black'}>
                    {cities && !citiesLoad
                        ?
                        <>
                            {cities[selectCity].name}
                        </>
                        :
                        <></>
                    }
                </Text>
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu} className={styles.CustomDropDownMenu}>
                {cities && !citiesLoad
                    ?
                    <>
                        {cities.filter((item) => !value || item.name.toLowerCase().startsWith(value.toLowerCase()))
                            .map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} eventKey={index}
                                                   active={Number(index) === Number(selectCity)}>{String(item.name)}</Dropdown.Item>
                                )
                            })}
                    </>
                    :
                    <Spinner variant={'danger'}/>
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}