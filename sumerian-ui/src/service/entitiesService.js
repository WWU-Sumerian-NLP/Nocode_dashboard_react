const KEYS = {
    entity: 'entity',
    entityID: 'entityID'
}

export function insertEntity(data) {
    let entity = getAllEntity();
    data['id'] = generateEntityId() 
    entity.push(data)
    localStorage.setItem(KEYS.entity, JSON.stringify(entity))
}

export function updateEntity(data) {
    let entity = getAllEntity();
    let recordInex = entity.findIndex(x => x.id == data.id);
    entity[recordInex] = { ...data }
    localStorage.setItem(KEYS.entity, JSON.stringify(entity));
}

export function deleteEntity(id) {
    let entity = getAllEntity();
    entity = entity.filter(x => x.id != id)
    localStorage.setItem(KEYS.entity, JSON.stringify(entity));
}

export function generateEntityId(){
    if(localStorage.getItem(KEYS.entityID) == null){
        localStorage.setItem(KEYS.entityID, '0')
    }
    var id = parseInt(localStorage.getItem(KEYS.entityID))
    localStorage.setItem(KEYS.entityID, (++id).toString())
    return id 
}

export function getAllEntity() {
    if(localStorage.getItem(KEYS.entity) == null){
        localStorage.setItem(KEYS.entity, JSON.stringify([]))
    }
    let entity = JSON.parse(localStorage.getItem(KEYS.entity));
    return entity.map(x => ({
        ...x,
    }))
}