class Child < ActiveRecord::Base
  # Relationships
  has_many :chores
  has_many :tasks, through: :chores

  # Validations
  validates_presence_of :first_name, :last_name
  
  # Scopes
  scope :alphabetical, -> { order('first_name, last_name') }
  scope :active, -> { where(active: true) }
  
  # Other methods
  def name
    first_name + " " + last_name
  end

  def points_earned
    self.chores.done.inject(0){|sum,chore| sum += chore.task.points}
  end

end
