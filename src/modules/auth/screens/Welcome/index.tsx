import React from 'react';
import { Formik, FormikValues } from 'formik';
import i18n from 'i18n-js';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { phoneRegExp } from '@config/constants';
import { RootState, useAppDispatch } from '@config/store';
import { queryOne } from '@modules/auth/store/action';
import Styles from './styles';

export default () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.auth.isLoading,
  );

  const onSubmit = async (values: FormikValues) => {
    await dispatch(queryOne());
    Alert.alert(`You typed ${values.email}`);
  };

  return (
    <Styles.Wrap>
      <Formik
        initialValues={{ email: '', phoneNumber: '' }}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          phoneNumber: Yup.string()
            .matches(phoneRegExp, i18n.t('invalid_field'))
            .required(i18n.t('field_required')),
          email: Yup.string()
            .email(i18n.t('invalid_field'))
            .required(i18n.t('field_required')),
        })}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          touched,
          errors,
        }) => (
          <>
            <Styles.Input
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email
              && <Styles.Txt>{errors.email}</Styles.Txt>}
            <Styles.Input
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
            />
            {touched.phoneNumber && errors.phoneNumber
              && <Styles.Txt>{errors.phoneNumber}</Styles.Txt>}
            <Styles.Btn onPress={!isLoading && handleSubmit} testID="tapBtn">
              <Styles.Txt accessibilityLabel="Text">
                {isLoading ? 'Wait..' : 'Submit'}
              </Styles.Txt>
            </Styles.Btn>
          </>
        )}
      </Formik>
    </Styles.Wrap>
  );
};
