import React, {forwardRef, useState} from "react";
import {Dropdown, Form} from "react-bootstrap";
import {Text} from "@shared/ui/index.js";


export const GeoDropDown = ({style}) => {
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
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Найти город"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

    return (
        <Dropdown style={style}>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <Text typeText={'regular'} sizeText={'14'} color={'black'}>Калининград</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                <Dropdown.Item eventKey="3" active>
                    Orange
                </Dropdown.Item>
                <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}