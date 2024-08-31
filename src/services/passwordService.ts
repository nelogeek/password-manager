
export interface PasswordEntry {
  title: string;
  password: string;
}

export const savePasswordToLocalStorage = (key: string, value: PasswordEntry[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadPasswordsFromLocalStorage = (key: string): PasswordEntry[] => {
  const savedPasswords = localStorage.getItem(key);
  return savedPasswords ? JSON.parse(savedPasswords) : [];
};

export const simulateServerRequest = (): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.5;
      const response = new Response(
        null,
        {
          status: isSuccess ? 200 : 500,
        }
      );
      resolve(response);
    }, 500); 
  });
};

export const addPassword = async (newPassword: PasswordEntry): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await simulateServerRequest();

    if (response.status === 200) {
      const passwords = loadPasswordsFromLocalStorage('passwords');
      passwords.push(newPassword);
      savePasswordToLocalStorage('passwords', passwords);
      console.log('Успех');
      
      return { success: true, message: 'Пароль успешно сохранен!' };
    } else {
      console.log('Отказ');
      return { success: false, message: 'Не удалось сохранить пароль... Ошибка сервера.' };
    }
  } catch (error) {
    return { success: false, message: 'Не удалось сохранить пароль... Ошибка сети.' };
  }
};

export const deletePassword = async (title: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await simulateServerRequest();

    if (response.status === 200) {
      const passwords = loadPasswordsFromLocalStorage('passwords');
      const updatedPasswords = passwords.filter(password => password.title !== title);
      savePasswordToLocalStorage('passwords', updatedPasswords);
      console.log('Успех');
      
      return { success: true, message: 'Сервис удален!' };
      
    } else {
      console.log('Отказ');
      return { success: false, message: 'Ошибка сервера. Не удалось удалить сервис.' };
    }
  } catch (error) {
    return { success: false, message: 'Ошибка сети. Не удалось удалить сервис.' };
  }
};


