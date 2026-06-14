export interface AITestCase {

    id: string;

    category:

        | "FUNCTIONAL"

        | "NEGATIVE"

        | "BOUNDARY"

        | "SECURITY";

    title: string;

    steps: string[];

    expectedResult: string;

}