const KEYS = {
    relation: 'relation',
    relationID: 'relationID'
}

export function insertRelation(data) {
    let relation=getAllRelation();
    data['id'] = generateRelationID() 
    relation.push(data)
    localStorage.setItem(KEYS.relation, JSON.stringify(relation))
}

export function updateRelation(data){
    let relation = getAllRelation();
    let recordIndex = relation.findIndex(x => x.id == data.id);
    relation[recordIndex] = {...data};
    localStorage.setItem(KEYS.relation, JSON.stringify(relation))
}

export function deleteRelation(id){
    let relation = getAllRelation();
    relation = relation.filter(x => x.id != id);
    localStorage.setItem(KEYS.relation, JSON.stringify(relation));
}

export function generateRelationID(){
    if(localStorage.getItem(KEYS.relationID) == null){
        localStorage.setItem(KEYS.relationID, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.relationID))
    localStorage.setItem(KEYS.relationID, (++id).toString())
    return id 
}

export function getAllRelation() {
    if(localStorage.getItem(KEYS.relation) == null){
        localStorage.setItem(KEYS.relation, JSON.stringify([]))
    }
    let relation = JSON.parse(localStorage.getItem(KEYS.relation))
    return relation.map(x => ({
        ...x,
    }))
}