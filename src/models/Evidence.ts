
export default class Evidence {
    private _id: number
    private _link: string
    private _idRequestForEvidence: number
    private _deliveryDate: Date
    constructor(
        id:number,
        link:string,
        idRequestForEvidence:number,
        deliveryDate:Date,
        ) {
        this._id = id
        this._link = link
        this._idRequestForEvidence = idRequestForEvidence
        this._deliveryDate = deliveryDate
    }

    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    public get idRequestForEvidence(): number {
        return this._idRequestForEvidence
    }
    public set idRequestForEvidence(value: number) {
        this._idRequestForEvidence = value
    }
    public get deliveryDate(): Date {
        return this._deliveryDate
    }
    public set deliveryDate(value: Date) {
        this._deliveryDate = value
    }
    public get link(): string {
        return this._link
    }
    public set link(value: string) {
        this._link = value
    }
}