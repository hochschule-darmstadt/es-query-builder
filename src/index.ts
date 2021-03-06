export interface QueryObject {
    query: {
        bool: {
            should: any[];
            must: any[];
            minimum_should_match?: number;
        };
    };
    sort: any[];
    size?: number;
    from?: number;
}

export type SortDirection = 'desc' | 'asc';

/**
 * A builder for an elasticsearch query
 */
export class QueryBuilder {
    /** query object */
    protected queryObject: QueryObject;

    // TODO: ofType expects EntityType -> make configurable via constructor or similar (?)

    /**
     * Create new QueryBuilder object.
     * @param query predefined query
     */
    constructor(query?: QueryObject) {
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
    public build(): QueryObject {
        return this.queryObject;
    }

    /**
     * Add should have prefix query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    public shouldPrefix(key: string, value: string): QueryBuilder {
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
    public shouldTerm(key: string, value: string): QueryBuilder {
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
    public shouldWildcard(key: string, value: string): QueryBuilder {
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
    public shouldMatch(key: string, value: string): QueryBuilder {
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
    public mustWildcard(key: string, value: string): QueryBuilder {
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
    public mustMatch(key: string, value: string): QueryBuilder {
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
    public mustShouldMatch(terms: Array<{ key:string, value:string }>): QueryBuilder {
        const shouldQuery: {bool: { should: Array<Object>}} = { bool: { should: [] } };
        terms.forEach((term: { key:string, value:string }) => shouldQuery.bool.should.push({ match: { [term.key]: term.value } }));
        this.queryObject.query.bool.must.push(shouldQuery);
        return this;
    }

    /**
     * Add must have term query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    public mustTerm(key: string, value: string): QueryBuilder {
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
    public ofType(type: string): QueryBuilder {
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
    public mustPrefix(key: string, value: string): QueryBuilder {
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
    public minimumShouldMatch(count: number): QueryBuilder {
        this.queryObject.query.bool.minimum_should_match = count;
        return this;
    }

    /**
     * Add a sort criterion to the query
     * @param attribute the attribute by which to sort the results
     * @param direction the sorting direction (default: desc)
     * @returns QueryBuilder
     */
    public sort(attribute:string, direction: SortDirection = 'desc'): QueryBuilder {
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
    public size(size: number = 20): QueryBuilder {
        this.queryObject.size = size;
        return this;
    }

    /**
     * Add result offset
     * @param from offset value - default is 0
     * @returns QueryBuilder instance
     */
    public from(from: number = 0): QueryBuilder {
        this.queryObject.from = from;
        return this;
    }

    /**
     * Override toString method
     */
    public toString = (): string => {
        return JSON.stringify(this.queryObject);
    };
}

export default QueryBuilder;
