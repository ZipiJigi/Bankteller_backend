type TermsOfService = {
    id: number;
    title: string;
    content: string;
    required?: boolean;
};
enum TermsOfServiceCategory {
    REGISTERATION = 0
}
type TermsOfServiceRequest = {
    categories: TermsOfServiceCategory[];
    tosIds: number[];
};
type TermsOfServiceResponse = {
    tos: TermsOfService[];
};
type AccountRegisterRequest = {
    accountKey: string;
    emailAddress: string;
    agreedTosIds: number[];
};
enum AccountRegisterationStatus {
    EMAIL_VALIDATION_REQUIRED = 0,
    KEY_ALREADY_EXISTS = 1,
    REGISTERED = 2,
    MALFORMED_KEY = 3,
    MALFORMED_EMAIL_ADDRESS = 4,
    MUST_AGREE_TOS = 5,
    FAILED = 6
}
type AccountRegisterResponse = {
    registered: boolean;
    status: AccountRegisterationStatus;
    emailValidationId?: string;
};
type ResendValidationEmailRequest = {
    emailValidationId: string;
};
type ResendValidationEmailResponse = {
    success: boolean;
};
type AccountEmailValidationRequest = {
    emailValidationId: string;
    emailValidationCode: string;
};
type AccountEmailValidationResponse = {
    success: boolean;
    accountId?: string;
};
