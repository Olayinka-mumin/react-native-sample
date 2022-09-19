import { useRef } from 'react';
import { FormikProps, FormikValues } from 'formik';
import { ToastShowParams } from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { showToast } from '@config/helpers';
import { IRequestError, IRequestErrorResponse } from '@config/models';
import { IReducerNames, RootState, useAppDispatch } from '@config/store';

export default (stateName?: IReducerNames) => {
  const dispatch = useAppDispatch();
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const isLoading = useSelector((state: RootState) => state[stateName || 'shared'].isLoading);

  const handleShowToast = (data: ToastShowParams) => {
    showToast(data);
  };

  const setFieldErrors = (errors: IRequestError[]) => {
    errors.forEach((error) => {
      formikRef.current?.setFieldError(error.field, error.message);
    });
  };

  const handleCatchErrorToast = (e: unknown) => {
    const response = e as { message: string };
    try {
      const error = JSON.parse(response.message) as IRequestErrorResponse;
      handleShowToast({ text1: error.message, type: 'error' });
      if (formikRef && error.errors.length) {
        setFieldErrors(error.errors);
      }
    } catch (_e) {
      handleShowToast({ text1: response.message, type: 'error' });
    }
  };

  return {
    dispatch,
    isLoading,
    handleShowToast,
    handleCatchErrorToast,
    formikRef,
  };
};
