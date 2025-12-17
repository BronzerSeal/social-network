export default function EmailForm({ resetUrl }: { resetUrl: string }) {
  return (
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              width="400"
              cellPadding={20}
              style={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <tbody>
                <tr>
                  <td align="center">
                    <h1
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        margin: "0 0 10px 0",
                      }}
                    >
                      Hello, it's Clixo
                    </h1>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#555",
                        margin: "0 0 20px 0",
                      }}
                    >
                      You received this message because you wanted to reset your
                      password. Click the button below:
                    </p>
                    <a
                      href={resetUrl}
                      style={{
                        display: "inline-block",
                        padding: "12px 20px",
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                      }}
                    >
                      Change password
                    </a>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "20px",
                      }}
                    >
                      If you didn't want to do this, just ignore this message.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
