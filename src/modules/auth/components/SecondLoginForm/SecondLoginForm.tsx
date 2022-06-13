import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../../models/auth';
import Button from '../Button/Button';
import InputForm from '../InputForm/InputForm';
import './SecondLoginForm.scss';
import { yupValidateLogin } from '../../utils';
import { Formik, Form, Field } from 'formik';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const SecondLoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  return (
    <Formik<ILoginParams>
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={yupValidateLogin}
      onSubmit={(values) => {
        onLogin(values);
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="secondloginform row g-3 needs-validation">
            {errorMessage ? (
              <div className=" secondloginform-errormessage alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <div className="col-md-12">
              <InputForm
                type="text"
                className="form-control"
                id="inputEmail"
                name="email"
                label="email"
                errorMessage={errors.email && touched.email ? errors.email : ''}
              />
            </div>
            <div className="col-md-12">
              <InputForm
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                label="password"
                errorMessage={errors.password && touched.password ? errors.password : ''}
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <Field className="form-check-input" type="checkbox" id="invalidCheck" name="rememberMe" />
                <label className="form-check-label" htmlFor="invalidCheck">
                  <FormattedMessage id="rememberMe" />
                </label>
              </div>
            </div>
            <div className="row justify-content-md-center secondloginform-btn">
              <div className="col-md-auto">
                <Button loading={loading} message="register" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SecondLoginForm;
