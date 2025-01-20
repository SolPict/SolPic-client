import { jest } from "@jest/globals";

export const createUserWithEmailAndPassword = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const mockOnAuthStateChanged = jest.fn((auth, callback) => {
  callback({ email: "test123@test.com" });

  return jest.fn();
});
