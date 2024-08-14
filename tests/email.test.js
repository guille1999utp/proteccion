const nodemailer = require("nodemailer");
const sendFibonacciEmail = require("../src/utils/nodemailer");
jest.mock("nodemailer");

const mockSendMail = jest.fn();
const mockVerify = jest.fn().mockResolvedValue(); 

beforeAll(() => {
  nodemailer.createTransport.mockReturnValue({
    sendMail: mockSendMail,
    verify: mockVerify,
  });
});

describe("Email Sender", () => {
  test("Envía un correo electrónico correctamente", async () => {
    mockSendMail.mockResolvedValue({});

    await sendFibonacciEmail("test@example.com", "15:49:08", [241, 149, 92]);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: "tu-email@gmail.com",
      to: "test@example.com",
      subject: "Serie Fibonacci Generada",
      text: expect.stringContaining(
        "La serie Fibonacci generada a las 15:49:08 es: 241, 149, 92."
      ),
    });
  });

  test("Lanza un error si el correo es inválido", async () => {
    await expect(
      sendFibonacciEmail("invalid-email", "15:49:08", [241, 149, 92])
    ).rejects.toThrow("El formato del correo electrónico es inválido.");
  });

  test("Maneja fallas en la conexión SMTP", async () => {
    mockSendMail.mockRejectedValue(new Error("Fallo de conexión SMTP"));

    await expect(
      sendFibonacciEmail("test@example.com", "15:49:08", [241, 149, 92])
    ).rejects.toThrow("No se pudo enviar el correo electrónico.");
  });
});