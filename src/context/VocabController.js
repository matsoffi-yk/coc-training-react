import { useEffect, useState } from 'react'
import firebase from '../firebase';

const VocabController = (authController) => {

    const { credential } = authController;
    let [vocabObj, setVocabObj] = useState(null);

    const col = credential ? firebase.firestore().collection(`/users/${credential.user.uid}/vocabs`) : null;

    useEffect(() => {
        if (credential) {
            const unsub = col.onSnapshot((snapshot) => {
                setVocabObj(vocabObj => {
                    snapshot.docs.forEach((doc) => {
                        const dataObj = doc.data();
                        const data = {
                            ...dataObj,
                            createdAt: dataObj.createdAt ? dataObj.createdAt.toDate() : null
                        }
                        if (!vocabObj) vocabObj = {};
                        vocabObj[doc.id] = data;
                    });
                    return { ...vocabObj };
                })
            });
            return () => unsub()
        }
    }, [credential]);

    const addVocab = (vocab) => {
        return col.doc(vocab.word.trim()).set({
            word: vocab.word.trim(),
            types: vocab.types,
            meanings: vocab.meanings.map(m => m.trim()),
            createdAt: new Date()
        });
    }

    const deleteVocab = (word) => {
        delete vocabObj[word]
        return col.doc(word).delete();
    }

    return {
        vocabObj,
        vocabs: vocabObj ? Object.values(vocabObj) : null,
        addVocab,
        deleteVocab
    }

}

export default VocabController
