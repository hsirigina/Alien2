import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Document, DocumentType } from '../types';
import { APP_SETTINGS } from '../constants';
import * as ImagePicker from 'react-native-image-picker';
import { addDocument, updateDocument, removeDocument } from '../store/slices/documentsSlice';

export const useDocuments = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.documents.documents);
  const selectedDocument = useSelector((state: RootState) => state.documents.selectedDocument);

  const pickDocument = useCallback(async (type: DocumentType) => {
    return new Promise<Document | null>((resolve, reject) => {
      const options = {
        mediaType: 'photo',
        maxWidth: APP_SETTINGS.MAX_IMAGE_DIMENSION,
        maxHeight: APP_SETTINGS.MAX_IMAGE_DIMENSION,
        quality: APP_SETTINGS.COMPRESSION_QUALITY,
      };

      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          resolve(null);
          return;
        }

        if (response.errorCode) {
          reject(new Error(response.errorMessage));
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          const document: Document = {
            id: Date.now().toString(),
            name: asset.fileName || 'Document',
            type,
            uri: asset.uri || '',
            status: 'pending',
            uploadDate: new Date().toISOString(),
          };
          resolve(document);
        } else {
          resolve(null);
        }
      });
    });
  }, []);

  const uploadDocument = useCallback(async (document: Document) => {
    try {
      // Here you would typically upload the document to your backend
      // For now, we'll just add it to the Redux store
      dispatch(addDocument(document));
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      return false;
    }
  }, [dispatch]);

  const deleteDocument = useCallback(async (documentId: string) => {
    try {
      dispatch(removeDocument(documentId));
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      return false;
    }
  }, [dispatch]);

  const updateDocumentStatus = useCallback(async (
    documentId: string,
    status: Document['status'],
    validationErrors?: string[]
  ) => {
    try {
      dispatch(updateDocument({ id: documentId, status, validationErrors }));
      return true;
    } catch (error) {
      console.error('Error updating document status:', error);
      return false;
    }
  }, [dispatch]);

  return {
    documents,
    selectedDocument,
    pickDocument,
    uploadDocument,
    deleteDocument,
    updateDocumentStatus,
  };
}; 