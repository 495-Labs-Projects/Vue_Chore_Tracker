class Task < ActiveRecord::Base
  # Relationships
  has_many :chores
  has_many :children, through: :chores

  # Validations
  validates_presence_of :name
  validates_numericality_of :points, only_integer: true, greater_than: 0
  
  # Scopes
  scope :alphabetical, -> { order('name') }
  scope :active, -> { where(active: true) }
end
