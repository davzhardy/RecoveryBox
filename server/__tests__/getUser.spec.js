describe("Get users Function", () => {
  test("it should get data for a specific user", () => {
    const input = [
      {req: {
        params: {
          username: "Raph",
        }
      }}
    ];

    const output = [{ id: "5412" , username: "Raph", email: "raphael@codeworks.com", password: "", firstName: "", lastName: "", registrationDate: "" }];

    expect(filterByTerm(input, "link")).toEqual(output);

  });
});