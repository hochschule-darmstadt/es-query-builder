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
export declare type SortDirection = 'desc' | 'asc';
/**
 * A builder for an elasticsearch query
 */
export declare class QueryBuilder {
    /** query object */
    protected queryObject: QueryObject;
    /**
     * Create new QueryBuilder object.
     * @param query predefined query
     */
    constructor(query?: QueryObject);
    /**
     * build the query object, aka return the query object
     * @returns QueryObject
     */
    build(): QueryObject;
    /**
     * Add should have prefix query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldPrefix(key: string, value: string): QueryBuilder;
    /**
     * Add should have term query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldTerm(key: string, value: string): QueryBuilder;
    /**
     * Add should have wildcard query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldWildcard(key: string, value: string): QueryBuilder;
    /**
     * Add should match query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    shouldMatch(key: string, value: string): QueryBuilder;
    /**
     * Add must have wildcard query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustWildcard(key: string, value: string): QueryBuilder;
    /**
     * Add must match query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustMatch(key: string, value: string): QueryBuilder;
    /**
     * Add must query with should match options
     * @param terms should options
     * @returns QueryBuilder instance
     */
    mustShouldMatch(terms: Array<{
        key: string;
        value: string;
    }>): QueryBuilder;
    /**
     * Add must have term query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustTerm(key: string, value: string): QueryBuilder;
    /**
     * Only search for results of the given type
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    ofType(type: string): QueryBuilder;
    /**
     * Add must have prefix query
     * @param key attribute name
     * @param value attribute value
     * @returns QueryBuilder instance
     */
    mustPrefix(key: string, value: string): QueryBuilder;
    /**
     * Add minimum should match count
     * @param count  minimum count
     * @returns QueryBuilder instance
     */
    minimumShouldMatch(count: number): QueryBuilder;
    /**
     * Add a sort criterion to the query
     * @param attribute the attribute by which to sort the results
     * @param direction the sorting direction (default: desc)
     * @returns QueryBuilder
     */
    sort(attribute: string, direction?: SortDirection): QueryBuilder;
    /**
     * Add result size
     * @param size size value - default is 20
     * @returns QueryBuilder instance
     */
    size(size?: number): QueryBuilder;
    /**
     * Add result offset
     * @param from offset value - default is 0
     * @returns QueryBuilder instance
     */
    from(from?: number): QueryBuilder;
    /**
     * Override toString method
     */
    toString: () => string;
}
export default QueryBuilder;
