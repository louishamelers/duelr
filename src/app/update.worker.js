addEventListener('message', ({ data }) => {
  console.log('works');
  console.log(data);
  postMessage('lekker');
});

