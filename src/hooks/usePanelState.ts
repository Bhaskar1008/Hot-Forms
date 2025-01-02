import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleComponentPanel, togglePropertiesPanel } from '../redux/slices/panelSlice';

export const usePanelState = () => {
  const dispatch = useDispatch();
  const { isComponentPanelOpen, isPropertiesPanelOpen } = useSelector(
    (state: RootState) => state.panel
  );

  return {
    isComponentPanelOpen,
    isPropertiesPanelOpen,
    toggleComponentPanel: () => dispatch(toggleComponentPanel()),
    togglePropertiesPanel: () => dispatch(togglePropertiesPanel())
  };
};