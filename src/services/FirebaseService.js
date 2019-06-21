import { fireBaseDB } from '../util/firebaseUtils'

export default class FirebaseService {

    static getUniqueDataById = (node, id, callback) => {

        const ref = fireBaseDB.ref(node + '/' + id)
        let newData = {}
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
                callback(null)
                return
            }

            const snap = dataSnapshot.val()
            const keys = Object.keys(snap)
            keys.forEach((key) => {
                newData[key] = snap[key]
            })
        }).then(() => {
            callback(newData)
        })
    }

    static updateData = (id, nodePath, objToUpdate) => {

        let ref = fireBaseDB.ref(nodePath).child(id)
        let result = ref.set(objToUpdate).then(() => global.resp = true).catch((err) => global.resp = err)

        return result
    }

    static pushData = (node, objToPush) => {
        const ref = fireBaseDB.ref(node).push()
        const id = fireBaseDB.ref(node).push().key
        ref.set(objToPush)
        return id
    }

    static getDataList = (nodePath, callback) => {
        let items = []
        let query = fireBaseDB.ref(nodePath)
        query.once('value').then(dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val()
                item['key'] = childSnapshot.key
                items.push(item)
            })
        }).then(() => {
            callback(items.reverse())
        })
    }

    static getFilterList = (nodePath, indexCol = "", filter = "", callback) => {

        let items = []
        let query = fireBaseDB.ref(nodePath)
        query.once('value').then(dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val()
                item['key'] = childSnapshot.key
                items.push(item)
            })
        }).then(() => {
            let array = items.reverse()
            let filtro = array.filter((elem) => {
                let val = elem[indexCol].toLowerCase()
                return (val.indexOf(filter) > -1)
            })
            callback(filtro)
        })
    }

    static remove = (id, node) => {
        return fireBaseDB.ref(node).child(id).remove()
    }

}