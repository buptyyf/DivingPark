import React from 'react';
import { Select, Icon } from 'antd';

require('./pickers.style.scss');
export interface PropsDefine { 
    onChange?: (name: string, id: number)=>{};
    value?: any
    options?: Array<string>; 
    id?: number;
    fresh: ()=>{};
}

const Option = Select.Option as React.ClassicComponentClass<any>;

export default class Picker extends React.Component<PropsDefine, any> {
    constructor(props: PropsDefine) {
        super(props);
    }
    handleChange(name: string) {
        console.log("handleChange: boardName: ", name)
        this.props.onChange(name, this.props.id);
    }
    render() {
        const { value, options, onChange, id } = this.props;
        // function handleChange(val: any) {
        //     onChange(val, id);
        // }
        return (
            <div className="select-container">
                <Select onChange={this.handleChange.bind(this)} value={value} style={{ width: 120 }}>
                {
                    options.map((option: string) =>
                        <Option value={option} key={option}>
                            {option}
                        </Option>
                    )
                }
                </Select>
                <button onClick={this.props.fresh} className="refresh">
                    <Icon type="retweet" /> 刷新  
                </button>
            </div>
        );
    }
}

