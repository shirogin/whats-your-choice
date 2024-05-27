import { createSlice } from '@reduxjs/toolkit';

import { ExtraObjectModalMap, ModalBodyTypes } from '&client/modals';

const modalInit: OpenableModalI<ModalBodyTypes, ExtraObjectModalMap[ModalBodyTypes]> = {
	title: '', // current  title state management
	isOpen: false, // modal state management for opening closing
	bodyType: 'DEFAULT', // modal content management
	size: '', // modal content management
	shake: false, // modal content management
	extraObject: null,
};
export const modalSlice = createSlice({
	name: 'modal',
	initialState: modalInit,
	reducers: {
		openModal: (state, action: { payload: ModalI<ModalBodyTypes, ExtraObjectModalMap[ModalBodyTypes]> }) => {
			const { title, bodyType, extraObject, size } = action.payload;
			state.isOpen = true;
			state.bodyType = bodyType;
			state.title = title;
			state.size = size || 'md';
			state.extraObject = extraObject;
		},
		setShake: (state, action: { payload: boolean }) => {
			state.shake = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.bodyType = 'DEFAULT';
			state.title = '';
			state.extraObject = null;
		},
	},
});

export const { openModal, closeModal, setShake } = modalSlice.actions;

export default modalSlice.reducer;
