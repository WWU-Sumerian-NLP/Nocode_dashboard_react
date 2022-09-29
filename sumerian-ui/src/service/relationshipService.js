const KEYS = {
    relationship: 'relationship',
    relationshipID: 'relationshipID'
}

export function insertRelationship(data) {
    let relationship = getAllRelationship();
    data['id'] = generateRelationshipID() 
    relationship.push(data)
    localStorage.setItem(KEYS.relationship, JSON.stringify(relationship))
}

export function updateRelationship(data){
    let relationship = getAllRelationship();
    let recordIndex = relationship.findIndex(x => x.id == data.id);
    relationship[recordIndex] = {...data};
    localStorage.setItem(KEYS.relationship, JSON.stringify(relationship))
}

export function deleteRelationship(id){
    let relationship = getAllRelationship();
    relationship = relationship.filter(x => x.id != id);
    localStorage.setItem(KEYS.relationship, JSON.stringify(relationship));
}

export function generateRelationshipID(){
    if(localStorage.getItem(KEYS.relationshipID) == null){
        localStorage.setItem(KEYS.relationshipID, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.relationshipID))
    localStorage.setItem(KEYS.relationshipID, (++id).toString())
    return id 
}

export function getAllRelationship() {
    if(localStorage.getItem(KEYS.relationship) == null){
        localStorage.setItem(KEYS.relationship, JSON.stringify([]))
    }
    let relationship = JSON.parse(localStorage.getItem(KEYS.relationship))
    return relationship.map(x => ({
        ...x,
    }))
}