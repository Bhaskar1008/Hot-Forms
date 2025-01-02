import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleOrientation } from '../redux/slices/formSlice';

export const useOrientation = () => {
  const dispatch = useDispatch();
  const orientation = useSelector((state: RootState) => state.form.orientation);

  const handleOrientationChange = () => {
    dispatch(toggleOrientation());
  };

  return {
    orientation,
    handleOrientationChange,
  };
};
