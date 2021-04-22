import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta }) => {
        // console.log(meta);
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className = {className}>
                <label>
                    {label}
                </label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = formValues => {
        //we don't want streamForm to decide how to handle submission.
        //Instead it should call a callback passed down from props from some parent component.
        this.props.onSubmit(formValues);
    }

    render() {
        console.log(this.props);
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field name="title" component={this.renderInput} label = "Enter Title" />
                <Field name="description" component= {this.renderInput} label = "Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
}

const validate = formValues => {
    const errors = {};
    //opportunity to validate title and description.
    //check if user entered in title or not.
    if (!formValues.title) {
        //only runs if user did not enter a title.
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must not enter a description';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
