class AddKudosPointsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :kudos_points, :integer, default: 0
  end
end
