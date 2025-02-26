function openTaskForm(taskColumn) {
  Swal.fire({
    title: "Adicionar Nova Tarefa",
    html: `
        <form id="taskForm">
          <label for="taskTitle">Título da Tarefa:</label>
          <input type="text" id="taskTitle" class="swal2-input" placeholder="Título" required />
  
          <label for="taskPriority">Prioridade:</label>
          <select id="taskPriority" class="swal2-input" required>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </form>
      `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Adicionar",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const taskTitle = document.getElementById("taskTitle").value;
      const taskPriority = document.getElementById("taskPriority").value;

      if (!taskTitle || !taskPriority) {
        Swal.showValidationMessage("Preencha todos os campos");
        return false;
      }

      return { taskTitle, taskPriority };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { taskTitle, taskPriority } = result.value;

      // Cria o novo card da tarefa
      const newCard = `
          <div class="kanban-card" draggable="true">
            <div class="badge ${taskPriority}">
              <span>${
                taskPriority === "low"
                  ? "Baixa"
                  : taskPriority === "medium"
                  ? "Média"
                  : "Alta"
              } prioridade</span>
            </div>
            <p class="card-title">${taskTitle}</p>
            <div class="card-infos">
              <div class="card-icons">
                <p><i class="fa-regular fa-comment"></i> 0</p>
                <p><i class="fa-solid fa-paperclip"></i> 0</p>
              </div>
              <div class="user">
                <img src="src/images/download.jpeg" alt="Avatar" />
              </div>
            </div>
          </div>
        `;

      // Adiciona o card à coluna correspondente
      const targetColumn = document.getElementById(taskColumn);
      targetColumn.insertAdjacentHTML("beforeend", newCard);

      Swal.fire("Sucesso!", "Tarefa adicionada com sucesso!", "success");
    }
  });
}
