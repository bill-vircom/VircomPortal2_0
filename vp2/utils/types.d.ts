interface Customer {
    customer:	string
    domainName:	string
    parentDomain:	string
    redSiftStack:	string
    redSiftOrgName:	string
    redSiftSift:	string
    redSiftDomain:	string
    nbrDomains:	number
    ppEssentialsPackage:	string
    hasSecurityAwareness:	boolean
    hasDmarc:	boolean
    hasO365Monitor:	boolean
    tenantId:	string
    bundleName:	string
}

interface ProofpointCustomer{
    customer: string
    primaryDomain: string
    parentDomain?: string
    uniqueSourceId: string
    children: ProofpointCustomer[]
}

interface Alert {
    id: number,
    alertType: number,
    alertDescription: string,
    alertTitle: string,
    alertDetail: string,
    alertSummary: string,
    admin: string,
    triggerDomain: string,
    uniqueSourceID: string,
    uniqueParentSourceID: string,
    destinationEmail: string,
    destinationPhone: string,
    userThatGeneratedAlert: string,
    uid: number,
    severity: number,
    reported: boolean,
    ipAddress: string,
    source: number,
    detailsUrl: string,
    grouping: number,
    triggerConditions: string,
    timeGenerated: string
}

type CustomerSelectorAsset = {
    customer: string;
    value: string;
    primaryDomain?: string
    parentDomain?: string
}