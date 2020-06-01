/**
 * A builder for an elasticsearch query
 */
export class QueryBuilder {
    // TODO: ofType expects EntityType -> make configurable via constructor or similar (?)
    /**
     * Create new QueryBuilder object.
     * @param query predefined query
     */
    constructor(query) {
        /**
         * Override toString method
         */
        this.toString = () => {
            return JSON.stringify(this.queryObject);
        };
        this.queryObject = query
            ? query
            : {
                query: { bool: { should: [], must: [] } },
                sort: []
            };
    }
    /**
     * build the query object, aka return the query object
     * @returns QueryObject
     */
    build() {
        return this.queryObject;
    }
    /**
     * Add should have prefix query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldPrefix(key, value) {
        this.queryObject.query.bool.should.push({
            prefix: { [key]: value }
        });
        return this;
    }
    /**
     * Add should have term query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldTerm(key, value) {
        this.queryObject.query.bool.should.push({
            term: { [key]: value }
        });
        return this;
    }
    /**
     * Add should have wildcard query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldWildcard(key, value) {
        this.queryObject.query.bool.should.push({
            wildcard: { [key]: '*' + value + '*' }
        });
        return this;
    }
    /**
     * Add should match query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldMatch(key, value) {
        this.queryObject.query.bool.should.push({
            match: { [key]: value }
        });
        return this;
    }
    /**
     * Add must have wildcard query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustWildcard(key, value) {
        this.queryObject.query.bool.must.push({
            wildcard: { [key]: '*' + value + '*' }
        });
        return this;
    }
    /**
     * Add must match query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustMatch(key, value) {
        this.queryObject.query.bool.must.push({
            match: { [key]: value }
        });
        return this;
    }
    /**
     * Add must query with should match options
     * @param terms should options
     * @returns QueryBuilder instance
     */
    mustShouldMatch(terms) {
        const shouldQuery = { bool: { should: [] } };
        terms.forEach((term) => shouldQuery.bool.should.push({ match: { [term.key]: term.value } }));
        this.queryObject.query.bool.must.push(shouldQuery);
        return this;
    }
    /**
     * Add must have term query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustTerm(key, value) {
        this.queryObject.query.bool.must.push({
            term: { [key]: value }
        });
        return this;
    }
    /**
     * Only search for results of the given type
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    // TODO: EntityType logic replacement (see constructor)
    ofType(type) {
        this.queryObject.query.bool.must.push({
            term: { type: type }
        });
        return this;
    }
    /**
     * Add must have prefix query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustPrefix(key, value) {
        this.queryObject.query.bool.must.push({
            prefix: { [key]: value }
        });
        return this;
    }
    /**
     * Add minimum should match count
     * @param count  minimum count
     * @returns QueryBuilder instance
     */
    minimumShouldMatch(count) {
        this.queryObject.query.bool.minimum_should_match = count;
        return this;
    }
    /**
     * Add a sort criterion to the query
     * @param attribute the attribute by which to sort the results
     * @param direction the sorting direction (default: desc)
     * @returns QueryBuilder
     */
    sort(attribute, direction = 'desc') {
        this.queryObject.sort.push({
            [attribute]: { order: direction }
        });
        return this;
    }
    /**
     * Add result size
     * @param size size value - default is 20
     * @returns QueryBuilder instance
     */
    size(size = 20) {
        this.queryObject.size = size;
        return this;
    }
    /**
     * Add result offset
     * @param from offset value - default is 0
     * @returns QueryBuilder instance
     */
    from(from = 0) {
        this.queryObject.from = from;
        return this;
    }
}
export default QueryBuilder;
//# sourceMappingURL=index.js.map