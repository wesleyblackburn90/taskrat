from flask import Blueprint, request
from app.models import Task, db
from sqlalchemy import desc

from app.models.models import Tag
from ..forms import TaskForm
from .auth_routes import validation_errors_to_error_messages

task_routes = Blueprint("tasks", __name__ )

@task_routes.route('')
def all_tasks():
  """ This route returns all available tasks sorted by most recent"""
  tasks = Task.query.filter(Task.available == True).all()
  print(tasks)
  return {"tasks" : [task.to_dict() for task in tasks]}

@task_routes.route('/<int:id>')
def single_task(id):
  """Gets single tasks by their id"""
  task = Task.query.get(id)
  return task.to_dict()

@task_routes.route('/new', methods=["GET", "POST"])
def create_task():
  """This route returns a form for a new task and posts a new task"""
  form = TaskForm()
  print("Hello, its me")
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print(form.data, "This is the form")
    task = Task(
      title = form.data["title"],
      description = form.data["description"],
      city = form.data["city"],
      state = form.data["state"],
      country = form.data["country"],
      price = form.data["price"],
      poster_id = form.data["poster_id"],
      danger_level = form.data["danger_level"],
      tags = form.data["tags"]
    )
    print(task, "No, THIS is me!")
    all_tags = Tag.query.all()
    # print(all_tags)
    # selected_tags = [tag.id for tag in all_tags]
    # print(selected_tags)
    task.tags = []

    db.session.add(task)
    db.session.commit()
    return task.to_dict()

  return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400


@task_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_task(id):
  """This route let's you edit a specific task"""
  task = Task.query.get(id)
  form = TaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    title = form.data["title"],
    description = form.data["description"],
    city = form.data["city"],
    state = form.data["state"],
    country = form.data["country"],
    price = form.data["price"],
    poster_id = form.data["poster_id"],
    danger_level = form.data["danger_level"]
    available = form.data["available"]

    task.title = title
    task.description = description
    task.city = city
    task.state = state
    task.country = country
    task.price = price
    task.poster_id = poster_id
    task.danger_level = danger_level
    task.available = available

    db.session.commit()
    return task.to_dict()
  return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400

@task_routes.route('/<int:id>', methods=['DELETE'])
def delete_task(id):
  """This route lets you delete a specific task"""
  task = Task.query.get(id)
  db.session.delete(task)
  db.session.commit()
  return task.to_dict()

@task_routes.route('/tags')
def get_tags():
  tags = Tag.query.all()
  print(tags)
  return {"tags": [tag.to_dict() for tag in tags]}
