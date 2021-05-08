<script>
  $(document).ready(function () {
	//Add the Student
	$("#addStudent").validate({
		 rules: {
				txtFirstName: "required",
				txtLastName: "required",
				txtAddress: "required"
			},
			messages: {
			},

		 submitHandler: function(form) {
		$("#addStudent").attr("action");
		  $.ajax({
			  data: $('#addStudent').serialize(),
			  url: /student,
			  type: "POST",
			  dataType: 'json',
			  success: function (data) {
				  var student = '<tr id="'+data.id+'">';
				  student += '<td>' + data.id + '</td>';
				  student += '<td>' + data.first_name + '</td>';
				  student += '<td>' + data.last_name + '</td>';
				  student += '<td>' + data.address + '</td>';
				  student += '<td><a data-id="' + data.id + '" class="btn btn-primary btnEdit">Edit</a>&nbsp;&nbsp;<a data-id="' + data.id + '" class="btn btn-danger btnDelete">Delete</a></td>';
				  student += '</tr>';
				  $('#studentTable tbody').prepend(student);
				  $('#addStudent')[0].reset();
				  $('#addModal').modal('hide');
			  },
			  error: function (data) {
			  }
		  });
		}
	});


    //When click edit student
    $('body').on('click', '.btnEdit', function () {
      var student_id = $(this).attr('data-id');
      $.get('student/' + student_id +'/edit', function (data) {
          $('#updateModal').modal('show');
          $('#updateStudent #hdnStudentId').val(data.id);
          $('#updateStudent #txtFirstName').val(data.first_name);
          $('#updateStudent #txtLastName').val(data.last_name);
          $('#updateStudent #txtAddress').val(data.address);
      })
   });
    // Update the student
	$("#updateStudent").validate({
		 rules: {
				txtFirstName: "required",
				txtLastName: "required",
				txtAddress: "required"

			},
			messages: {
			},

		 submitHandler: function(form) {
		  var form_action = $("#updateStudent").attr("action");
		  $.ajax({
			  data: $('#updateStudent').serialize(),
			  url: form_action,
			  type: "POST",
			  dataType: 'json',
			  success: function (data) {
				  var student = '<td>' + data.id + '</td>';
				  student += '<td>' + data.first_name + '</td>';
				  student += '<td>' + data.last_name + '</td>';
				  student += '<td>' + data.address + '</td>';
				  student += '<td><a data-id="' + data.id + '" class="btn btn-primary btnEdit">Edit</a>&nbsp;&nbsp;<a data-id="' + data.id + '" class="btn btn-danger btnDelete">Delete</a></td>';
				  $('#studentTable tbody #'+ data.id).html(student);
				  $('#updateStudent')[0].reset();
				  $('#updateModal').modal('hide');
			  },
			  error: function (data) {
			  }
		  });
		}
	});

   //delete student
	$('body').on('click', '.btnDelete', function () {
      var student_id = $(this).attr('data-id');
      $.get('student/' + student_id +'/delete', function (data) {
          $('#studentTable tbody #'+ student_id).remove();
      })
   });

});
</script>
