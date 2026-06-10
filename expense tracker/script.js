let expenses = [];
        let expenseCounter = 0;
 
        document.getElementById("tracker").addEventListener("click",function(event)
        {
            event.preventDefault();
            const title  = document.getElementById("title").value.trim();
            const amount = Number(document.getElementById("amount").value.trim());
            const category = document.getElementById("category").value;
 
            if (!title || !document.getElementById("amount").value)
            {
                document.getElementById("error").textContent = "all fields are required";
                return;
            }
            if (amount<=0)
            {
                document.getElementById("error").textContent="please enter a valid amount"
                return;
            }

            document.getElementById("error").textContent = "";
 
            let newExpense = {
                id       : expenseCounter,
                title,
                amount,
                category
            };
 
            expenseCounter++;
            expenses.push(newExpense);
            
            document.getElementById("entry").reset();
            renderTable();
        })
 
        function deleteExpense(id)
        {  
            const indexToDelete = expenses.findIndex((exp) => exp.id===id);
            expenses.splice(indexToDelete, 1);
            renderTable();
        }
 
        function renderTable()
        {
            const tbody   = document.getElementById("expense-body");
            const section = document.getElementById("expense-section");
            const totalEl = document.getElementById("total-amount");
 
            tbody.innerHTML = "";
 
            section.style.display = (expenses.length === 0) ? "none" : "block";
            if (expenses.length===0) return;

            expenses.forEach((exp, i) => { 
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${exp.title}</td>
                    <td>
                        <span class="category-badge ${exp.category}">
                            ${exp.category}
                        </span>
                    </td>
                    <td>₹${exp.amount.toFixed(2)}</td>
                    <td>
                        <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
                    </td>
                `;
 
                tbody.appendChild(row);})
 
            let total = expenses.reduce((total,exp)=> total + exp.amount, 0);
            totalEl.textContent = `₹${total.toFixed(2)}`;
        }