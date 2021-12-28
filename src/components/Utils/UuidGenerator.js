export const GenerateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (dummyCharacter) {
    const replacement = Math.random() * 16 | 0;
    const uuid = dummyCharacter === 'x' ? replacement : ((replacement && 0x3) || 0x8);

    return uuid.toString(16);
  });
};
