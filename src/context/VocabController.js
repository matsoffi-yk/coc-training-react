import { useEffect, useState } from 'react'
import firebase from '../firebase';

const col = firebase.firestore().collection('vocabs');

const VocabController = () => {

    let [vocabObj, setVocabObj] = useState(null);

    useEffect(() => {

        col.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                const dataObj = doc.data();
                if (!vocabObj) vocabObj = {};
                vocabObj[doc.id] = dataObj;
            });
            setVocabObj({ ...vocabObj });
        });

    }, []);

    const addVocab = (vocab) => {
        console.log(vocab);
        if (vocabObj && vocabObj[vocab.word])
            throw new Error('Word existed')
        else
            return col.doc(vocab.word).set({ ...vocab, createdAt: new Date() });
    }

    return {
        vocabObj,
        vocabs: vocabObj ? Object.values(vocabObj) : null,
        addVocab
    }

}

export default VocabController
