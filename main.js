import './style.css';

const onClickAdd = () => {
  // テキストボックスの内容を取得し、初期化する
  const inputText = document.getElementById('add-text').value;
  document.getElementById('add-text').value = '';

  // 未完了リストに追加
  createIncompleteTodo(inputText);
};

// 渡された引数をもとに未完了のTODOを作成する関数
const createIncompleteTodo = (todo) => {
  // li生成
  const li = document.createElement('li');

  //div生成
  const div = document.createElement('div');
  div.classList.add('list-row');

  // p生成
  const p = document.createElement('p');
  p.classList.add('todo-item');
  p.innerText = todo;

  // button（完了）生成
  const completeBtn = document.createElement('button');
  completeBtn.innerText = '完了';
  completeBtn.addEventListener('click', function () {
    // buttonの親にあるliタグ配下の完了ボタンと削除ボタンを消去
    const moveTatget = this.closest('li');
    this.nextElementSibling.remove();
    this.remove();

    // 完了リストに移動
    document.getElementById('complete-list').appendChild(moveTatget);

    // 戻すボタンを生成してli>divタグ配下に設定
    const backBtn = document.createElement('button');
    backBtn.innerText = '戻す';
    backBtn.addEventListener('click', function () {
      // TODOの内容を取得し、未完了リストに追加
      const todoText = this.previousElementSibling.innerText;
      createIncompleteTodo(todoText);

      // 戻すボタンの親にあるliタグを削除
      this.closest('li').remove();
    });
    moveTatget.firstElementChild.appendChild(backBtn);
  });

  // button（削除）生成
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '削除';
  deleteBtn.addEventListener('click', function () {
    // buttonの親にあるliを完了リストから消去
    const deleteTarget = this.closest('li');
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  // liタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById('incomplete-list').appendChild(li);
};

document.getElementById('add-button').addEventListener('click', onClickAdd);
