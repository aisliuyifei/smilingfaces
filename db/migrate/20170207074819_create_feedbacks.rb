class CreateFeedbacks < ActiveRecord::Migration
  def change
    create_table :feedbacks do |t|
      t.integer :code
      t.string :desc
      t.boolean :photo
      t.boolean :error

      t.timestamps null: false
    end
  end
end
