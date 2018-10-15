const xMen = [{id: 0, name: "Cyclops"}, {id: 1, name: "Storm"}]
let idCounter = 2;

module.exports = {

    /**
     * adds the XMan to the roster
     */
    addXMan: function(xMan) {
        xMan.id = idCounter;
        xMen.push(xMan)
        idCounter++;
        return xMan
    },

    /**
     * Attempts to update an XMan with the specified id.  
     * Returns the XMan if successful
     * Returns false if the XMan cannot be found.
     */
    updateXMan: function(id, xMan) {
        xMan.id = id
        const index = xMen.findIndex(e => e.id == id)
        if (index === -1)
            return false
        else xMen.splice(index, 1, xMan)
        return xMan
    },

    /**
     * Deletes the XMan if found.
     */
    deleteXMan: function(id) {
        const index = xMen.findIndex(e => e.id == id)
        if(index !== -1){
            xMen.splice(index, 1)
            return true
        }
        else return false;
    },

    /**
     * Returns the requested XMan if found.
     * Returns false if not found.
     */
    getXMan: function(id) {
        const index = xMen.findIndex(e => e.id == id)
        if (index === -1)
            return false
        else return xMen[index]
    },

    /**
     * Returns all X-Men
     */
    getAllXmen: function() {
        return xMen
    },

    /**
     * Return all X-Men with the provided name
     */
    getAllXmenFilteredByName: (name) => {
        return xMen.filter(xMan => xMan.name == name)
    }
}