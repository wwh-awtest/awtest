interface InviteRequest {
  name: string;
  email: string;
}

type InviteResponse = "Registered" | { errorMessage: string };

export class InviteService {
  static async requestInvite(request: InviteRequest): Promise<InviteResponse> {
    return fetch(
      "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((_) => _.json());
  }
}
